import { Component, Input, OnInit } from '@angular/core';
import { User } from "../models/user.model";
import { GithubService } from "../services/github.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [GithubService]
})
export class ProfilePageComponent implements OnInit {
  @Input()
  username!: string;
  user!: User;

  constructor(
    private githubService: GithubService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.githubService.getUser(this.username).subscribe(user => {
        this.user = user;
        this.githubService.getRepositories(user.repos_url).subscribe(repos => {
          this.user.repositories = repos;
        });
      },
      error =>{
        console.error(error);      
      });
    });
  }

  get sortedRepositories(){
    return this.user.repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);
  }

  searchUser() {
    this.router.navigate(['/profile', this.username]);
  }

  sendEmail() {
    if (this.user.email != null) {
      window.open(`mailto:${this.user.email}`);
    }
    else{
      alert("O usuário não adicionou um email.")
    }
  }

  back(){
    this.router.navigate(['/']);
  }
}