begin;

alter table authors      drop constraint authors_user_id_fkey,
  add constraint authors_user_id_fkey foreign key (user_id) references users(id) on delete cascade;

alter table books        drop constraint books_created_by_fkey,
  add constraint books_created_by_fkey foreign key (created_by) references users(id) on delete set null;

alter table book_authors drop constraint book_authors_authors_id_fkey,
  add constraint book_authors_authors_id_fkey foreign key (author_id) references authors(id) on delete cascade;
alter table book_authors drop constraint book_authors_books_id_fkey,
  add constraint book_authors_books_id_fkey foreign key (book_id) references books(id) on delete cascade;

alter table tags         drop constraint tags_created_by_fkey,
  add constraint tags_created_by_fkey foreign key (created_by) references users(id) on delete set null;

alter table book_tags    drop constraint book_tags_book_id_fkey,
  add constraint book_tags_book_id_fkey foreign key (book_id) references books(id) on delete cascade;
alter table book_tags    drop constraint book_tags_tag_id_fkey,
  add constraint book_tags_tag_id_fkey foreign key (tag_id) references tags(id) on delete cascade;

alter table bookmarks    drop constraint bookmarks_book_id_fkey,
  add constraint bookmarks_book_id_fkey foreign key (book_id) references books(id) on delete cascade;
alter table bookmarks    drop constraint bookmarks_user_id_fkey,
  add constraint bookmarks_user_id_fkey foreign key (user_id) references users(id) on delete cascade;

alter table ratings      drop constraint ratings_book_id_fkey,
  add constraint ratings_book_id_fkey foreign key (book_id) references books(id) on delete cascade;
alter table ratings      drop constraint ratings_user_id_fkey,
  add constraint ratings_user_id_fkey foreign key (user_id) references users(id) on delete cascade;

alter table comments     drop constraint comments_book_id_fkey,
  add constraint comments_book_id_fkey foreign key (book_id) references books(id) on delete cascade;
alter table comments     drop constraint comments_user_id_fkey,
  add constraint comments_user_id_fkey foreign key (user_id) references users(id) on delete cascade;

alter table notifications drop constraint notifications_user_id_fkey,
  add constraint notifications_user_id_fkey foreign key (user_id) references users(id) on delete cascade;

alter table book_rankings drop constraint book_rankings_book_id_fkey,
  add constraint book_rankings_book_id_fkey foreign key (book_id) references books(id) on delete cascade;

alter table chapters     drop constraint chapters_book_id_fkey,
  add constraint chapters_book_id_fkey foreign key (book_id) references books(id) on delete cascade;

alter table banners      drop constraint banners_book_id_fkey,
  add constraint banners_book_id_fkey foreign key (book_id) references books(id) on delete cascade;

commit;