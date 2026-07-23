using System.Text.Json;
using GeoInsight.Api.Models;

namespace GeoInsight.Api.Services;

public class StationService : IStationService
{
    private readonly List<Station> _stations;

    public StationService(IWebHostEnvironment env)
    {
        var path = Path.Combine(env.ContentRootPath, "Data", "stations.json");
        var json = File.ReadAllText(path);
        _stations = JsonSerializer.Deserialize<List<Station>>(
            json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new();
    }

    public IReadOnlyList<Station> Query(string? type, double? lat, double? lng, double? radiusKm)
    {
        IEnumerable<Station> results = _stations;

        // Spatial filter: keep only stations within radiusKm of the reference point.
        if (lat.HasValue && lng.HasValue && radiusKm.HasValue)
        {
            results = results.Where(s =>
                GeoSpatial.DistanceKm(lat.Value, lng.Value, s.Latitude, s.Longitude) <= radiusKm.Value);
        }

        return results.ToList();
    }

    public Station? GetById(int id) => _stations.FirstOrDefault(s => s.Id == id);

    public IReadOnlyList<string> GetTypes() =>
        _stations.Select(s => s.Type).Distinct().OrderBy(t => t).ToList();
}
