-- Triggers
select event_object_table as table_name, trigger_name,
       event_manipulation, action_timing, action_statement
from information_schema.triggers
where trigger_schema = 'public'
order by 1, 2;

-- Foreign keys with ON DELETE / ON UPDATE rules
select conrelid::regclass as table_name, conname,
       pg_get_constraintdef(oid) as definition
from pg_constraint
where contype = 'f' and connamespace = 'public'::regnamespace
order by 1, 2;