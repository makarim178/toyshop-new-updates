using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class removeRElationContact : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ContactDetail_ContactDetailId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ContactDetailId",
                table: "AspNetUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ContactDetailId",
                table: "AspNetUsers",
                column: "ContactDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ContactDetail_ContactDetailId",
                table: "AspNetUsers",
                column: "ContactDetailId",
                principalTable: "ContactDetail",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
