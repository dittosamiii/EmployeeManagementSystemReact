package com.springboot.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
