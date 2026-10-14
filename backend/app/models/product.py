import uuid
from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, ForeignKey, Index, Numeric, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import TimestampMixin

if TYPE_CHECKING:
    from app.models.store import Store


class Product(TimestampMixin, Base):
    __tablename__ = "products"
    __table_args__ = (
        CheckConstraint("char_length(btrim(name)) >= 2", name="name_min_length"),
        CheckConstraint("price >= 0", name="price_non_negative"),
        CheckConstraint(
            "original_price IS NULL OR original_price > price",
            name="original_price_above_price",
        ),
        # يخدم قائمة منتجات المتجر مرتبةً، ويغني عن فهرس منفصل على store_id
        Index("ix_products_store_id_sort_order", "store_id", "sort_order"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
        server_default=text("gen_random_uuid()"),
    )
    store_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("stores.id", ondelete="CASCADE"))

    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(String(300))
    category: Mapped[str | None] = mapped_column(String(40))

    # خانتان عشريتان كحد أقصى، وأقصى قيمة 99,999,999.99
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    original_price: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))

    image_key: Mapped[str | None] = mapped_column(String(255))

    visible: Mapped[bool] = mapped_column(default=True, server_default=text("true"))
    available: Mapped[bool] = mapped_column(default=True, server_default=text("true"))
    sort_order: Mapped[int] = mapped_column(default=0, server_default=text("0"))

    store: Mapped["Store"] = relationship(back_populates="products")