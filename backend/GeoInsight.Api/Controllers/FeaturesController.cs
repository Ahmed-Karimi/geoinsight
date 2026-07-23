using GeoInsight.Api.Models;
using GeoInsight.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GeoInsight.Api.Controllers;

[ApiController]
[Route("api/features")]
public class FeaturesController : ControllerBase
{
    private readonly IStationService _service;

    public FeaturesController(IStationService service) => _service = service;

    /// <summary>
    /// GET /api/features?type=Weather&amp;lat=..&amp;lng=..&amp;radiusKm=..
    /// Returns matching stations as a GeoJSON FeatureCollection.
    /// </summary>
    [HttpGet]
    public ActionResult<FeatureCollection> Get(
        [FromQuery] string? type,
        [FromQuery] double? lat,
        [FromQuery] double? lng,
        [FromQuery] double? radiusKm)
    {
        var stations = _service.Query(type, lat, lng, radiusKm);
        return Ok(ToFeatureCollection(stations));
    }

    [HttpGet("{id:int}")]
    public ActionResult<Station> GetById(int id)
    {
        var station = _service.GetById(id);
        return station is null ? NotFound() : Ok(station);
    }

    /// <summary>Distinct station types, for the layer/type selector.</summary>
    [HttpGet("types")]
    public ActionResult<IReadOnlyList<string>> GetTypes() => Ok(_service.GetTypes());

    private static FeatureCollection ToFeatureCollection(IReadOnlyList<Station> stations)
    {
        var fc = new FeatureCollection();
        foreach (var s in stations)
        {
            fc.Features.Add(new Feature
            {
                Geometry = new Geometry { Coordinates = new[] { s.Longitude, s.Latitude } },
                Properties = new Dictionary<string, object?>
                {
                    ["id"] = s.Id,
                    ["name"] = s.Name,
                    ["type"] = s.Type,
                    ["status"] = s.Status,
                    ["lastReading"] = s.LastReading,
                    ["unit"] = s.Unit,
                }
            });
        }
        return fc;
    }
}
