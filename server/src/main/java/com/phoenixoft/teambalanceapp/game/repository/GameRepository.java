package com.phoenixoft.teambalanceapp.game.repository;

import com.phoenixoft.teambalanceapp.game.entity.Game;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends CrudRepository<Game, Long> {
}
