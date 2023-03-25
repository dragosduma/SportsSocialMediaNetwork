package com.dragos.sportsnetworkserver.model;

public enum SportType {
    FOOTBALL,
    BASKETBALL,
    TABLE_TENNIS,
    TENNIS,
    SWIMMING,
    WATCH_PARTY,
    RUNNING,
    CYCLING;

    public static SportType fromString(String sportTypeString) {
        for (SportType sportType : SportType.values()) {
            if (sportType.name().equalsIgnoreCase(sportTypeString)) {
                return sportType;
            }
        }
        throw new IllegalArgumentException("Invalid sport type: " + sportTypeString);
    }
}