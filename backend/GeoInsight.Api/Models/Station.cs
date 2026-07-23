namespace GeoInsight.Api.Models;

/// <summary>A monitoring station in the field network.</summary>
public class Station
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;   // Weather | AirQuality | Water | Seismic
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Status { get; set; } = string.Empty;  // Online | Offline | Maintenance
    public double LastReading { get; set; }
    public string Unit { get; set; } = string.Empty;
}

// --- GeoJSON output DTOs (RFC 7946) ---

public class FeatureCollection
{
    public string Type => "FeatureCollection";
    public List<Feature> Features { get; set; } = new();
}

public class Feature
{
    public string Type => "Feature";
    public Geometry Geometry { get; set; } = new();
    public Dictionary<string, object?> Properties { get; set; } = new();
}

public class Geometry
{
    public string Type => "Point";
    // GeoJSON coordinate order is [longitude, latitude].
    public double[] Coordinates { get; set; } = System.Array.Empty<double>();
}
