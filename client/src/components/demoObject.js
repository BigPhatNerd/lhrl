import create_goals from '../img/create_goals.png';
import five_k from '../img/five_k.png';
import home from '../img/home.png';
import latest_strava from '../img/latest_strava.png';
import workouts_completed from '../img/workouts_completed.png';
import goals from '../img/goals.png';
const demoObject =[
{
	img: home,
	title: `LHRL® App Home Page`,
	text: [`• LHRL® App allows you to connect your Strava accounts, create workouts, sign up for various distance programs, and set weekly goals.`, `• Use the "Home tab" of the App or simply enter /lhrl to bring up app modal`, `• All of your info stored in one place and delivered straight to your slack workspace.`, `• Each morning there will be a new CrossFit style WOD loaded into the app which you can track your score.`, `• Choose to follow any one of a few distance running plans.`, `• Keep motivated by involving your friends and co-workers`],
	alt: `Pic of App homepage`
},
{
img: create_goals,
title: `Create Weekly Goals`,
text: [`• Set weekly, adjustable goals that you can track throughout the week.`, `• Share goals and your progress with others in your channel...or not 🤫.`, `• Every Saturday night your goals will reset and begin new on Sunday.`, `• Feel free to increase or decrease your goals throughout the week.`, `• Add as many movements toward your goal count as you wish.`, `• Share your progress graph and reps with friends, workers and teammates in your channel.`],
alt: 'create weekly goals'
},
{
	img: five_k,
	title: `Sign Up for Programs`,
	text: [`• Sign up for various programs to achieve your distance goals`, `• Have your daily workout delivered straight to your app`,`• Store your workout data and notes to compare it later`,`• Schedule or remove programs at the click of a button.`, `• Let the app tell you when it is time to rest and when you have work to do.`],
	alt: 'sign up for 5k'
},

{
	img: latest_strava,
	title: `Link Your Strava Account`,
	text: [`• View latest Strava workout`, `• Automatically post latest Strava workout so your friends and co-workers can help cheer you on.`, `• Deauthorize Strava at the click of a button.`, `• Automatically add Strava miles to your goal miles`, `• Ability to view last Strava workout on your homepage and have it automatically shared in your channel.`],
	alt: `Pic of Strava`
},
{
	img: workouts_completed,
	title: `View Created or Completed Workouts`,
	text: [`• Create workouts that can be completed and added to your "Completed Workouts" calendar to be referenced later.`, `• Refer to activity calendar to see what workouts you did on different days.`, `• Ability to delete, edit, create or redo workouts.`, `• Add notes to all workouts for later references.`, `• Workouts stored and created according to Time, Distance, Load, Reps, and Other.`],
	alt: 'Pic of workouts completed.'
},
{
	img: goals,
	title: "Track Weekly Goals",
	text: [`• Set goals at the beginning of the week`, `• Share goals with others in your workspace`, `• Keep track of your progress within your app.`, `• Add/update goals or reps at any time.`]

}
];

export default demoObject