package com.phoenixoft.teambalanceapp.game.repository;

import com.phoenixoft.teambalanceapp.game.entity.GameBalancing;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameBalancingRepository extends CrudRepository<GameBalancing, Long> {
}
