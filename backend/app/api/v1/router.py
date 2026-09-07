"""Aggregated API v1 Router."""

from fastapi import APIRouter
from app.api.v1.endpoints import patients

api_router = APIRouter()

# Include Patients endpoints under /patients
api_router.include_router(patients.router, prefix="/patients", tags=["Patients"])
