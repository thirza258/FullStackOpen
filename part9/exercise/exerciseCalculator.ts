export interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  };
  
function calculateExercises(exerciseHours: number[], target: number): ExerciseResult {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours > 0).length;
    const totalHours = exerciseHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
  
    let rating: number;
    let ratingDescription: string;
  
    if (average >= target) {
      rating = 3;
      ratingDescription = "Great job! You've met or exceeded your target.";
    } else if (average >= target * 0.75) {
      rating = 2;
      ratingDescription = "Good effort! You're almost there.";
    } else {
      rating = 1;
      ratingDescription = "You need to improve. Keep trying!";
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  }

  
try {
    const target = Number(process.argv[2]);
    const exerciseHours = process.argv.slice(3).map(hours => Number(hours));
    console.log(calculateExercises(exerciseHours, target));
  }
    catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }

export { calculateExercises };