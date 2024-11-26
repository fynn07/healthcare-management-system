using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server_dotnet.Migrations
{
    /// <inheritdoc />
    public partial class SocialHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SocialHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    patient_id = table.Column<int>(type: "integer", nullable: false),
                    date_added = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    nicotine_consumption = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    alcohol_consumption = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    drugs_taken = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    diet = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    physical_activity = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialHistory_Patients_patient_id",
                        column: x => x.patient_id,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SocialHistory_patient_id",
                table: "SocialHistory",
                column: "patient_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SocialHistory");
        }
    }
}
