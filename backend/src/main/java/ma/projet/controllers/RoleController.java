package ma.projet.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.projet.entities.Role;
import ma.projet.services.RoleService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {

	@Autowired
	private RoleService service;

	@GetMapping
	public List<Role> findAllRole() {
		return service.findAll();
	}

	@PostMapping("/create")
	public Role createRole(@RequestBody Role role) {
		role.setId(0);
		return service.create(role);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> findById(@PathVariable Integer id) {
		Role role = service.findById(id);
		if (role == null) {
			return new ResponseEntity<Object>("Role avec ID = " + id + " n'existe pas", HttpStatus.BAD_REQUEST);
		} else {
			return ResponseEntity.ok(role);
		}
	}

	@PutMapping("update/{id}")
	public ResponseEntity<Object> updateRole(@PathVariable Integer id, @RequestBody Role newRole) {
		Role oldRole = service.findById(id);
		if (oldRole == null) {
			return new ResponseEntity<Object>("Role avec ID = " + id + " n'existe pas", HttpStatus.BAD_REQUEST);
		} else {
			newRole.setId(id);
			return ResponseEntity.ok(service.update(newRole));
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteRole(@PathVariable Integer id) {
		Role role = service.findById(id);
		if (role == null) {
			return new ResponseEntity<Object>("Role avec ID = " + id + " n'existe pas", HttpStatus.BAD_REQUEST);
		} else {
			service.delete(role);
			return ResponseEntity.ok("filière supprimée");
		}
	}
	
}