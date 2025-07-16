resource "google_sql_database_instance" "aibers" {
  name = "aibers-instance"
  database_version = "MYSQL_8_0"
  region = "us-central1"
  settings {
    tier = "db-f1-micro"
  }
}
resource "google_sql_database" "aibers_db" {
  name = "aibers_db"
  instance = google_sql_database_instance.aibers.name
}
