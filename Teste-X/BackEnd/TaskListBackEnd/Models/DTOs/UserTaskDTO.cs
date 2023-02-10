namespace Task_List_Backend.Models.DTOs;

public class UserTaskDTO
{
    public int Id { get; set; }
    public DateTime TimeStart { get; set; }
    public DateTime TimeEnd { get; set; }
    public string Subject { get; set; }
    public string Description { get; set; }
    public bool IsCompleted { get; set; }
}