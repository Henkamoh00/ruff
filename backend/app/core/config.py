from functools import lru_cache
from typing import Literal

from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

MIN_SECRET_LENGTH = 32
PLACEHOLDER_MARK = "CHANGE_ME"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_env: Literal["development", "production"] = "development"
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR"] = "INFO"
    enable_docs: bool = False

    # بلا قيم افتراضية: غيابها يوقف الإقلاع
    database_url: str
    redis_url: str
    jwt_secret_key: str
    csrf_secret_key: str

    @field_validator("database_url")
    @classmethod
    def _check_database_url(cls, value: str) -> str:
        if not value.startswith("postgresql+psycopg://"):
            raise ValueError("DATABASE_URL يجب أن يبدأ بـ postgresql+psycopg://")
        if PLACEHOLDER_MARK in value:
            raise ValueError("DATABASE_URL ما زال يحتوي قيمة CHANGE_ME")
        return value

    @field_validator("redis_url")
    @classmethod
    def _check_redis_url(cls, value: str) -> str:
        if not value.startswith(("redis://", "rediss://")):
            raise ValueError("REDIS_URL يجب أن يبدأ بـ redis:// أو rediss://")
        if PLACEHOLDER_MARK in value:
            raise ValueError("REDIS_URL ما زال يحتوي قيمة CHANGE_ME")
        return value

    @field_validator("jwt_secret_key", "csrf_secret_key")
    @classmethod
    def _check_secret(cls, value: str) -> str:
        if PLACEHOLDER_MARK in value:
            raise ValueError("السر ما زال قيمة CHANGE_ME")
        if len(value.encode("utf-8")) < MIN_SECRET_LENGTH:
            raise ValueError(f"السر يجب ألا يقل عن {MIN_SECRET_LENGTH} بايت")
        return value

    @model_validator(mode="after")
    def _check_consistency(self) -> "Settings":
        if self.jwt_secret_key == self.csrf_secret_key:
            raise ValueError("JWT_SECRET_KEY و CSRF_SECRET_KEY يجب أن يكونا مختلفين")
        if self.app_env == "production" and self.enable_docs:
            raise ValueError("ENABLE_DOCS لا يجوز تفعيله في الإنتاج")
        return self

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()