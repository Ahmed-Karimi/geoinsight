namespace GeoInsight.Api.Services;

/// <summary>Geospatial helpers.</summary>
public static class GeoSpatial
{
    private const double EarthRadiusKm = 6371.0;

    /// <summary>
    /// Great-circle distance between two points, in kilometres (Haversine formula).
    /// </summary>
    public static double DistanceKm(double lat1, double lon1, double lat2, double lon2)
    {
        var dLat = lat2 - lat1;
        var dLon = lon2 - lon1;

        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(lat1) * Math.Cos(lat2) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        return EarthRadiusKm * c;
    }
}
