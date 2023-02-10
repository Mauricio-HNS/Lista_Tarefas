using System.ComponentModel.DataAnnotations.Schema;

namespace Task_List_Backend.Models
{
    public class UserTask : BaseModel
    {
        public int Id { get; set; }
        public virtual User User { get; set; }
        [Required]
        public virtual string UserId { get; set; }
        [Required]
        public DateTime TimeStart { get; set; }
        [Required]
        public DateTime TimeEnd { get; set; }
        [Required]
        [MaxLength(100)]
        public string Subject { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }
        public bool IsCompleted { get; set; }

        [NotMapped]
        public TimeSpan Duration
        {
            get { return TimeEnd - TimeStart; }
        }
    }
}

