CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY, 
	"dueDate" DATE,
    "task" VARCHAR (70),
	"completed" BOOLEAN,
    "notes" VARCHAR(120)
);

INSERT INTO "tasks" ("dueDate", "task", "completed", "notes")
VALUES ('01-12-2021', 'Install VS Code', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'VS Code extensions', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'Slack', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'Homebrew', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'Node.js', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'Connect Github to VS Code', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'Install Heroku CLI', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'PostgreSQL', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'Postico', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'Postman', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'Install Google Chrome', FALSE, 'Setup for newly repaired laptop'),
 ('01-12-2021', 'Test Everything', FALSE, 'Setup for newly repaired laptop');
