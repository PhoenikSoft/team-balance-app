create table tbl_game_balancing
(
    game_id bigint
        constraint game_balancing_pk primary key
        constraint game_fk references tbl_game,
    balanced_teams jsonb,
    used_balancing integer[] default array[]::integer[]
);
alter table tbl_game_balancing owner to postgres;

insert into tbl_game_balancing select id, balanced_teams from tbl_game g
where g.balanced_teams IS NOT NULL;

ALTER TABLE tbl_game DROP COLUMN balanced_teams;
