using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class extendUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ValuesTB",
                schema: "Test");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "User",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Interest",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Introduction",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KnownAs",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LookingFor",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifyDate",
                table: "User",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RegisterDate",
                table: "User",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "UserPhoto",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    Url = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    RegisterDate = table.Column<DateTime>(nullable: false),
                    IsMain = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPhoto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPhoto_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserPhoto_UserId",
                table: "UserPhoto",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPhoto");

            migrationBuilder.DropColumn(
                name: "City",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "User");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Interest",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Introduction",
                table: "User");

            migrationBuilder.DropColumn(
                name: "KnownAs",
                table: "User");

            migrationBuilder.DropColumn(
                name: "LookingFor",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ModifyDate",
                table: "User");

            migrationBuilder.DropColumn(
                name: "RegisterDate",
                table: "User");

            migrationBuilder.EnsureSchema(
                name: "Test");

            migrationBuilder.CreateTable(
                name: "ValuesTB",
                schema: "Test",
                columns: table => new
                {
                    xID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    xTitle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValuesTB", x => x.xID);
                });
        }
    }
}
