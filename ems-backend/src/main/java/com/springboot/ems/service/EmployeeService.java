package com.springboot.ems.service;

import java.util.List;

import com.springboot.ems.dto.EmployeeDto;

public interface EmployeeService {
	EmployeeDto createEmployee(EmployeeDto employeeDto);

	EmployeeDto getEmployeeById(Long id);

	List<EmployeeDto> getAllEmployees();

	EmployeeDto updateEmployee(EmployeeDto employeeDto, Long id);

	void deleteEmployee(Long id);
}
