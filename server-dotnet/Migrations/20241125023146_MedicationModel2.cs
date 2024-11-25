using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server_dotnet.Migrations
{
    /// <inheritdoc />
    public partial class MedicationModel2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicationHistories_Patients_patient_id",
                table: "MedicationHistories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicationHistories",
                table: "MedicationHistories");

            migrationBuilder.RenameTable(
                name: "MedicationHistories",
                newName: "MedicationHistory");

            migrationBuilder.RenameIndex(
                name: "IX_MedicationHistories_patient_id",
                table: "MedicationHistory",
                newName: "IX_MedicationHistory_patient_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicationHistory",
                table: "MedicationHistory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicationHistory_Patients_patient_id",
                table: "MedicationHistory",
                column: "patient_id",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicationHistory_Patients_patient_id",
                table: "MedicationHistory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicationHistory",
                table: "MedicationHistory");

            migrationBuilder.RenameTable(
                name: "MedicationHistory",
                newName: "MedicationHistories");

            migrationBuilder.RenameIndex(
                name: "IX_MedicationHistory_patient_id",
                table: "MedicationHistories",
                newName: "IX_MedicationHistories_patient_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicationHistories",
                table: "MedicationHistories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicationHistories_Patients_patient_id",
                table: "MedicationHistories",
                column: "patient_id",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
