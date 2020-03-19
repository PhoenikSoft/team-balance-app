package com.phoenixoft.teambalanceapp.user.repository;

import com.phoenixoft.teambalanceapp.user.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);

    @Query("SELECT r FROM Role r WHERE r.name LIKE CONCAT('%_', ?1)")
    List<Role> findAllByGroupId(long groupId);
}
