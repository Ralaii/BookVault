select tablename, policyname, permissive, roles, cmd,
       qual as using_expression, with_check
from pg_policies
where schemaname = 'public'
order by tablename, policyname;