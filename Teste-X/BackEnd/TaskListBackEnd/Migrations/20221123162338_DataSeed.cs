using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Task_List_Backend.Migrations
{
    /// <inheritdoc />
    public partial class DataSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "1", 0, "123", "johndoe@vl.net", true, false, null, "johndoe@vl.net", "john_doe", "123", "+1 00 99999999", true, "123", true, "john_doe" });

            migrationBuilder.InsertData(
                table: "UserTasks",
                columns: new[] { "Id", "Description", "IsCompleted", "Subject", "TimeEnd", "TimeStart", "UserId" },
                values: new object[] { 1, "Far far away, behind the word mountains, far from the", false, "Far far away", new DateTime(2022, 11, 23, 15, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2022, 11, 23, 14, 0, 0, 0, DateTimeKind.Unspecified), "1" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserTasks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1");
        }
    }
}
