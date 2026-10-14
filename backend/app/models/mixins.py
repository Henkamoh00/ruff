from datetime import datetime

from sqlalchemy import DateTime, func
from sqlalchemy.orm import Mapped, mapped_column


class TimestampMixin:
    """تاريخا الإنشاء والتحديث بتوقيت UTC، وتُملآن من قاعدة البيانات."""

    # sort_order يبقي العمودين في آخر الجدول بدل أن يسبقا المفتاح الأساسي
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        sort_order=9990,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
        sort_order=9991,
    )