"""Aggregated API v1 Router."""

from fastapi import APIRouter
from app.api.v1.endpoints import appointments, notes, patients, settings, vitals

api_router = APIRouter()

# Include resource endpoints for Milestones 1-10
api_router.include_router(patients.router, prefix="/patients", tags=["Patients"])
api_router.include_router(vitals.router, prefix="/patients", tags=["Vitals"])
api_router.include_router(notes.router, tags=["Clinical Notes"])
api_router.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
api_router.include_router(settings.router, prefix="/settings", tags=["Settings & Protocols"])
