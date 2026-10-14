import asyncio

import structlog
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from sqlalchemy import text

from app.core.database import engine

router = APIRouter(prefix="/health", tags=["health"])
logger = structlog.get_logger("app.health")

CHECK_TIMEOUT_SECONDS = 3


async def _check_database() -> None:
    async with engine.connect() as connection:
        await connection.execute(text("SELECT 1"))


async def _check_redis(request: Request) -> None:
    await request.app.state.redis.ping()


async def _run(name: str, coro) -> bool:
    try:
        await asyncio.wait_for(coro, timeout=CHECK_TIMEOUT_SECONDS)
    except Exception as exc:  # noqa: BLE001 - نسجل نوع الخطأ فقط دون تفاصيل الاتصال
        logger.warning("readiness_check_failed", dependency=name, error=type(exc).__name__)
        return False
    return True


@router.get("/live")
async def live() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/ready")
async def ready(request: Request) -> JSONResponse:
    database_ok, redis_ok = await asyncio.gather(
        _run("database", _check_database()),
        _run("redis", _check_redis(request)),
    )
    checks = {
        "database": "ok" if database_ok else "unavailable",
        "redis": "ok" if redis_ok else "unavailable",
    }
    all_ok = database_ok and redis_ok
    return JSONResponse(
        status_code=200 if all_ok else 503,
        content={"status": "ok" if all_ok else "unavailable", "checks": checks},
    )