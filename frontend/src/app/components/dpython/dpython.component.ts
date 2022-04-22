import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChallengeService } from '../../services/challenge.service';

@Component({
  selector: 'app-dpython',
  templateUrl: './dpython.component.html',
  styleUrls: ['./dpython.component.css']
})
export class DpythonComponent implements OnInit {
  challenges: any = []
  juniorChallenges: any = []
  semiChallenges: any = []
  seniorChallenges: any = []

  isApplicant: boolean = false
  constructor(
    private authService: AuthService,
    private challengeService: ChallengeService
  ) { }

  ngOnInit (): void {
    this.isApplicant = this.authService.getTypeUser() === 'applicant' ? true : false;
    this.challengeService.getChallengeByCategory('python').subscribe(res => {
      this.challenges = res
      this.juniorChallenges = this.getChallengesByLevel('Junior')
      this.semiChallenges = this.getChallengesByLevel('Semisenior')
      this.seniorChallenges = this.getChallengesByLevel('Senior')
    })
  }

  getChallengesByLevel(level: string) {
    return this.challenges.filter((challenge: any) =>  challenge.level === level )
  }
  jugar(){

  }
}
