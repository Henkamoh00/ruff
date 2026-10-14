import uuid
from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, ForeignKey, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import TimestampMixin

if TYPE_CHECKING:
    from app.models.product import Product
    from app.models.user import User


class Store(TimestampMixin, Base):
    __tablename__ = "stores"
    __table_args__ = (
        CheckConstraint("char_length(btrim(name)) >= 2", name="name_min_length"),
        CheckConstraint("currency ~ '^[A-Z]{3}$'", name="currency_format"),
        # الهاتف: أرقام فقط (8-15) مع + اختيارية. الواتساب: صيغة دولية بـ +.
        CheckConstraint("phone IS NULL OR phone ~ '^\\+?[0-9]{8,15}$'", name="phone_format"),
        CheckConstraint(
            "whatsapp IS NULL OR whatsapp ~ '^\\+[0-9]{8,15}$'",
            name="whatsapp_international_format",
        ),
        CheckConstraint("phone IS NOT NULL OR whatsapp IS NOT NULL", name="contact_required"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
        server_default=text("gen_random_uuid()"),
    )
    # unique هنا يفرض «متجر واحد لكل حساب» داخل PostgreSQL
    owner_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
    )

    name: Mapped[str] = mapped_column(String(80))
    description: Mapped[str | None] = mapped_column(String(300))
    # قائمة الأنشطة المسموحة تُفحص في الـ schema، فتتغير دون ترحيل
    category: Mapped[str] = mapped_column(String(40))
    # رمز ISO 4217. القائمة المسموحة تُفحص في الـ schema، والقيد يضمن الصيغة فقط
    currency: Mapped[str] = mapped_column(String(3))

    city: Mapped[str] = mapped_column(String(60))
    address: Mapped[str | None] = mapped_column(String(150))
    phone: Mapped[str | None] = mapped_column(String(20))
    whatsapp: Mapped[str | None] = mapped_column(String(20))

    instagram: Mapped[str | None] = mapped_column(String(300))
    facebook: Mapped[str | None] = mapped_column(String(300))
    website: Mapped[str | None] = mapped_column(String(300))

    # مفاتيح التخزين النسبية، وليست مسارات مطلقة
    logo_key: Mapped[str | None] = mapped_column(String(255))
    cover_key: Mapped[str | None] = mapped_column(String(255))

    published: Mapped[bool] = mapped_column(default=False, server_default=text("false"))
    # حالة النشر قبل طلب حذف الحساب، لاستعادتها إن أُلغي الحذف. NULL خارج مهلة الحذف.
    published_before_deletion: Mapped[bool | None] = mapped_column()

    # الخطة تحدد حد المنتجات في الكود. لا يغيّرها المستخدم من API عادي.
    plan: Mapped[str] = mapped_column(String(20), default="free", server_default="free")

    owner: Mapped["User"] = relationship(back_populates="store")
    products: Mapped[list["Product"]] = relationship(
        back_populates="store",
        cascade="all, delete-orphan",
        passive_deletes=True,
        order_by="Product.sort_order",
    )