"""
Centralized app settings, loaded from environment variables / .env.
Nothing in this file should ever contain a real secret - see .env.example
for the variables this expects, and .env (gitignored) for real values.
"""

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # App
    APP_NAME: str = "AI Resume Builder & Career Assistant"
    ENVIRONMENT: str = "development"
    API_V1_PREFIX: str = "/api"

    # CORS - comma-separated list of allowed origins
    CORS_ORIGINS: str = (
        "http://localhost:5173,"
        "http://127.0.0.1:5173,"
        "https://ai-resume-builder-u81yk2rdh-morvexissite.vercel.app"
    )

    # OpenAI
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"

    # Database
    DATABASE_URL: str = "sqlite:///./app.db"

    @property
    def cors_origins_list(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.CORS_ORIGINS.split(",")
            if origin.strip()
        ]

    @property
    def ai_enabled(self) -> bool:
        return bool(self.OPENAI_API_KEY)


@lru_cache
def get_settings() -> Settings:
    return Settings()
