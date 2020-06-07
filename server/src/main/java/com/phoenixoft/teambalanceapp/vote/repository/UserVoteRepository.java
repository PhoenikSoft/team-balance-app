package com.phoenixoft.teambalanceapp.vote.repository;

import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.vote.entity.UserVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserVoteRepository extends JpaRepository<UserVote, Long> {

    boolean existsByForUserAndVoterAndGame(User forUser, User voter, Game game);
}
