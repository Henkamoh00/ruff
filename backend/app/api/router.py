from fastapi import APIRouter

# يُضاف إليه كل راوتر لاحقًا (auth، stores، products، ...) تحت البادئة /api
api_router = APIRouter(prefix="/api")