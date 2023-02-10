namespace Task_List_Backend.Repositories.Contracts;

public interface IRepositoryContract<T> where T : class
{
    Task<List<T>> GetAll();
    Task<T?> GetById(int id);
    Task<T> Update(int id, T entity);
    Task<T> Create(T entity);
    void Delete(int id);
    bool Exists(int id);
}
