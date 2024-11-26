using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server_dotnet.Migrations
{
    /// <inheritdoc />
    public partial class VaccinationModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VaccinationHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    patient_id = table.Column<int>(type: "integer", nullable: false),
                    date_added = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    date_administered = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    vaccine_name = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    brand_name = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    provider = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    site_given = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    dose_ml = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    next_dose_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VaccinationHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VaccinationHistory_Patients_patient_id",
                        column: x => x.patient_id,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VaccinationHistory_patient_id",
                table: "VaccinationHistory",
                column: "patient_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VaccinationHistory");
        }
    }
}
