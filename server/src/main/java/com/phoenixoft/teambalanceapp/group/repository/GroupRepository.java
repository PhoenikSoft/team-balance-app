package com.phoenixoft.teambalanceapp.group.repository;

import com.phoenixoft.teambalanceapp.group.entity.Group;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends CrudRepository<Group, Long> {

    boolean existsById(Long groupId);

    boolean existsByName(String name);

    Optional<Group> findByRef(String ref);
}
