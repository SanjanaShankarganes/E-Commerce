	package com.example.ecombackend.controller;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.web.bind.annotation.*;
	
	import com.example.ecombackend.model.User;
	import com.example.ecombackend.service.ApiResponse;
	import com.example.ecombackend.service.UserService;
	
	@RestController
	@RequestMapping("/api")
	public class SignupController {
	
	    @Autowired
	    private UserService userService;
	
	    @PostMapping("/signup")
	    public ApiResponse signup(@RequestBody User user) {
	        boolean isSaved = userService.registerUser(user);
	        
	        if (isSaved) {
	            return new ApiResponse(true, "User registered successfully!");
	        } else {
	            return new ApiResponse(false, "Error registering user!");
	        }
	    }
	    
	    @GetMapping("/checkDuplicate/{name}")
	    public ApiResponse isDuplicate(@PathVariable String name) {
	        return new ApiResponse(userService.isUsernameTaken(name), userService.isUsernameTaken(name) ? "Duplicate" : "Not Duplicate");
	    }
	
	    @PostMapping("/isauth")
	    public ApiResponse accessDashboard(@RequestHeader("Authorization") String token) {
	        String email = userService.validateJwt(token.replace("Bearer ", ""));
	        if (email != null) {
	            return new ApiResponse(true, "Access granted to dashboard for user: " + email);
	        }
	        return new ApiResponse(false, "Invalid or expired token. Please log in.");
	    }
	
	    @PostMapping("/auth")
	    public ApiResponse login(@RequestBody User user) {
	        return userService.login(user.getEmail(), user.getPassword());
	    }
	}
