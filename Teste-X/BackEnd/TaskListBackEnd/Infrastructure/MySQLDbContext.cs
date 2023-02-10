namespace Task_List_Backend.Infrastructure;

public class MySQLDbContext : IdentityDbContext<User>
{
    public DbSet<UserTask> UserTasks { get; set; }

    public MySQLDbContext(DbContextOptions<MySQLDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserTask>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Subject).IsRequired();
            entity.Property(e => e.TimeStart).IsRequired();
            entity.Property(e => e.TimeEnd).IsRequired();
            entity.HasOne(d => d.User);
        });

        #region DatabaseSeed

        modelBuilder
            .Entity<User>()
            .HasData(
                new User
                {
                    Id = "1",
                    UserName = "john_doe",
                    NormalizedUserName = "john_doe",
                    Email = "johndoe@vl.net",
                    NormalizedEmail = "johndoe@vl.net",
                    EmailConfirmed = true,
                    PasswordHash = "123",
                    SecurityStamp = "123",
                    ConcurrencyStamp = "123",
                    PhoneNumber = "+1 00 99999999",
                    PhoneNumberConfirmed = true,
                    TwoFactorEnabled = true,
                    LockoutEnd = null,
                    LockoutEnabled = false,
                    AccessFailedCount = 0
                }
            );

        modelBuilder
            .Entity<UserTask>()
            .HasData(
                new UserTask
                {
                    Id = 1,
                    TimeStart = new DateTime(2022, 11, 23, 14, 00, 00),
                    TimeEnd = new DateTime(2022, 11, 23, 15, 00, 00),
                    Subject = "Far far away",
                    Description = "Far far away, behind the word mountains, far from the",
                    UserId = "1"
                }
            );
            
        #endregion
    }
}
