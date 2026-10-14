import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, DateTime, Index, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import TimestampMixin

if TYPE_CHECKING:
    from app.models.store import Store


class User(TimestampMixin, Base):
    __tablename__ = "users"
    __table_args__ = (
        CheckConstraint("char_length(btrim(name)) >= 2", name="name_min_length"),
        # البريد يُوحَّد (أحرف صغيرة) قبل التخزين، والقيد يمنع تسرّب بريد غير موحّد
        CheckConstraint("email = lower(email)", name="email_lowercase"),
        # فهرس جزئي يخدم أمر الحذف النهائي: لا يضم إلا الحسابات التي طلبت الحذف
        Index(
            "ix_users_deletion_requested_at",
            "deletion_requested_at",
            postgresql_where=text("deletion_requested_at IS NOT NULL"),
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
        server_default=text("gen_random_uuid()"),
    )
    name: Mapped[str] = mapped_column(String(80))
    email: Mapped[str] = mapped_column(String(254), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255))

    # بداية مهلة الحذف (30 يومًا). NULL تعني أن الحساب لم يطلب الحذف.
    deletion_requested_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    store: Mapped["Store | None"] = relationship(
        back_populates="owner",
        uselist=False,
        cascade="all, delete-orphan",
        passive_deletes=True,
    )