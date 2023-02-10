namespace Task_List_Backend.Repositories.Base;

public abstract class BaseRepository<T> : IRepositoryContract<T> where T : class
{
    protected readonly MySQLDbContext _context;
    private DbSet<T> _entities;

    public BaseRepository(MySQLDbContext context)
    {
        _context = context;
    }

    protected DbSet<T> Entities
    {
        get
        {
            if (_entities == null)
            {
                _entities = _context.Set<T>();
            }

            return _entities;
        }
    }

    public async Task<List<T>> GetAll()
    {
        return await Entities.ToListAsync();
    }

    public async Task<T?> GetById(int id)
    {
        return await Entities.FindAsync(id);
    }

    public async Task<T> Update(int id, T entity)
    {
        Entities.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<T> Create(T entity)
    {
        Entities.Add(entity);
        await _context.SaveChangesAsync();

        return entity;
    }

    public async void Delete(int id)
    {
        var entity = await Entities.FindAsync(id);
        Entities.Remove(entity);
        _context.SaveChanges();
    }

    public bool Exists(int id)
    {
        return (Entities?.FindAsync(id) != null ? true : false);
    }
}
