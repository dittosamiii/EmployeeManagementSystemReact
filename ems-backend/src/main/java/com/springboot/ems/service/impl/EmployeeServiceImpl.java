package com.springboot.ems.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.springboot.ems.dto.EmployeeDto;
import com.springboot.ems.entity.Employee;
import com.springboot.ems.exception.ResourceNotFoundException;
import com.springboot.ems.repository.EmployeeRepository;
import com.springboot.ems.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository;
	private ModelMapper modelMapper;

	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		Employee employee = modelMapper.map(employeeDto, Employee.class);
		Employee savedEmployee = employeeRepository.save(employee);
		return modelMapper.map(savedEmployee, EmployeeDto.class);
	}

	@Override
	public EmployeeDto getEmployeeById(Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee Not Found with this ID: " + id));

		return modelMapper.map(employee, EmployeeDto.class);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		List<Employee> employee = employeeRepository.findAll();
		return employee.stream().map((entity) -> modelMapper.map(entity, EmployeeDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updateEmployee(EmployeeDto employeeDto, Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee Not Found with this ID: " + id));
		employee.setFirstName(employeeDto.getFirstName());
		employee.setLastName(employeeDto.getLastName());
		employee.setEmail(employeeDto.getEmail());
		Employee savedEmployee = employeeRepository.save(employee);
		return modelMapper.map(savedEmployee, EmployeeDto.class);
	}

	@Override
	public void deleteEmployee(Long id) {
		employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee Not Found with this ID: " + id));
		employeeRepository.deleteById(id);

	}

}
