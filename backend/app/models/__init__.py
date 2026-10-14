# استيراد كل النماذج هنا ضروري كي يراها Alembic ضمن Base.metadata
from app.models.product import Product
from app.models.store import Store
from app.models.user import User

__all__ = ["Product", "Store", "User"]