﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PostgreSQL.Data;

#nullable disable

namespace server_dotnet.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("20241125004135_PatientModel")]
    partial class PatientModel
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Patient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("address");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("birthday");

                    b.Property<string>("ContactNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("character varying(15)")
                        .HasColumnName("contact_number");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)")
                        .HasColumnName("first_name");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("gender");

                    b.Property<int>("Height")
                        .HasColumnType("integer")
                        .HasColumnName("height");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)")
                        .HasColumnName("last_name");

                    b.Property<string>("MiddleName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)")
                        .HasColumnName("middle_name");

                    b.Property<int>("ProviderId")
                        .HasColumnType("integer")
                        .HasColumnName("provider_id");

                    b.Property<int>("Weight")
                        .HasColumnType("integer")
                        .HasColumnName("weight");

                    b.HasKey("Id");

                    b.HasIndex("ProviderId");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("server_dotnet.Models.Provider", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("name");

                    b.Property<string>("ProviderLocation")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("provider_location");

                    b.Property<string>("ProviderType")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("provider_type");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Providers");
                });

            modelBuilder.Entity("server_dotnet.Models.Token", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("server_dotnet.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Patient", b =>
                {
                    b.HasOne("server_dotnet.Models.Provider", "Provider")
                        .WithMany()
                        .HasForeignKey("ProviderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Provider");
                });

            modelBuilder.Entity("server_dotnet.Models.Provider", b =>
                {
                    b.HasOne("server_dotnet.Models.User", "Account")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("server_dotnet.Models.Token", b =>
                {
                    b.HasOne("server_dotnet.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
