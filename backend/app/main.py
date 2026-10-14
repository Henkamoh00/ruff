import asyncio
import sys
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

# psycopg غير المتزامن لا يعمل مع ProactorEventLoop الافتراضي على ويندوز
if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import structlog  # noqa: E402
from fastapi import FastAPI  # noqa: E402

from app.api.health import router as health_router  # noqa: E402
from app.api.router import api_router  # noqa: E402
from app.core.config import get_settings  # noqa: E402
from app.core.database import engine  # noqa: E402
from app.core.logging import configure_logging  # noqa: E402
from app.core.middleware import RequestIdMiddleware  # noqa: E402
from app.core.redis import create_redis  # noqa: E402

settings = get_settings()
configure_logging(settings.log_level)
logger = structlog.get_logger("app")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    app.state.redis = create_redis(settings.redis_url)
    logger.info("startup", env=settings.app_env)
    try:
        yield
    finally:
        await app.state.redis.aclose()
        await engine.dispose()
        logger.info("shutdown")


app = FastAPI(
    title="Raff API",
    lifespan=lifespan,
    docs_url="/docs" if settings.enable_docs else None,
    redoc_url=None,
    openapi_url="/openapi.json" if settings.enable_docs else None,
)

app.add_middleware(RequestIdMiddleware)

app.include_router(health_router)
app.include_router(api_router)