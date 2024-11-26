public class PaginationService
{
    public object GetPaginatedResponse<T>(List<T> data, int page)
    {
        var pageSize = 5;
        var totalItems = data.Count;
        var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        var paginatedData = data.Skip((page - 1) * pageSize).Take(pageSize).ToList();

        return new
        {
            count = totalItems,
            total_pages = totalPages,
            current_page = page,
            next = page < totalPages ? $"api/medication_history/fetch?page={page + 1}" : null,
            previous = page > 1 ? $"api/medication_history/fetch?page={page - 1}" : null,
            results = paginatedData
        };
    }
}
