CREATE TABLE IF NOT EXISTS "public"."questions" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "question_num" bigint NOT NULL,
    "question_text" "text" NOT NULL,
    "positive_text" "text" NOT NULL,
    "negative_text" "text" NOT NULL
);
CREATE TABLE IF NOT EXISTS "public"."participants" (
    "id" serial primary key,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "gender" int8 not null default 1,
    "grade" "text",
    "region" "text" NOT NULL DEFAULT '결측',
    "schoolname" "text",
    "age" int8 not null default 1,
    "age_raw" "text",
    "result_type" text not null
);
CREATE TABLE IF NOT EXISTS "public"."answers" (
    "id" serial NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "question_id" bigint NOT NULL,
    "answer" int8 NOT NULL,
    "answer_text" "text",
    "user_id" serial REFERENCES "public"."participants"("id"),
    "code" "text"
);
create view all_view as
select a.gender,
    a.grade,
    a.age,
    b.question_id,
    b.answer,
    count(b.answer)
from participants a
    left join answers b on(a.id = b.user_id)
group by a.gender,
    a.grade,
    a.age,
    a.grade,
    question_id,
    b.answer
order by a.gender,
    a.grade,
    a.age,
    a.grade,
    question_id,
    b.answer;
create view all_types as
select gender,
    grade,
    age,
    result_type,
    count(result_type)
from participants
group by gender,
    grade,
    age,
    result_type;
    
create view all_opinions as
select a.gender,
    a.age,
    a.grade,
    b.question_id,
    b.answer,
    b.answer_text
from participants a
    left join answers b on a.id = b.user_id;
--          API URL: http://127.0.0.1:54321
--      GraphQL URL: http://127.0.0.1:54321/graphql/v1
--   S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
--           DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
--       Studio URL: http://127.0.0.1:54323
--     Inbucket URL: http://127.0.0.1:54324
--       JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
--         anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
-- service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
--    S3 Access Key: 625729a08b95bf1b7ff351a663f3a23c
--    S3 Secret Key: 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907
--        S3 Region: local