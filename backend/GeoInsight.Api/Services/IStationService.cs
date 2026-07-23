using GeoInsight.Api.Models;

namespace GeoInsight.Api.Services;

public interface IStationService
{
    /// <summary>
    /// Returns stations, optionally filtered by type and/or by distance
    /// (within <paramref name="radiusKm"/> of the given lat/lng).
    /// </summary>
    IReadOnlyList<Station> Query(string? type, double? lat, double? lng, double? radiusKm);

    Station? GetById(int id);

    IReadOnlyList<string> GetTypes();
}
