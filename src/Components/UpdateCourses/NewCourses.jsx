import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './NewCourses.css'

function NewCourses() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [randomNumber, setRandomNumber] = useState(1);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3004/courses');
      setCourses(response.data)
      setIsLoading(false)
    }
    catch {
      setIsLoading(false)
    }
  }

  const getRandomCourse = async (randomNumber) => {
    try {
      const response = await axios.get(`http://localhost:3004/courses/${randomNumber}`)
      setCourse(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const getRandomNumber = (min, max) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(randomNumber)
    getRandomCourse(randomNumber)
  }

  const decrease = (randomNumber) => {
    if (randomNumber === 1) {
      setRandomNumber(courses.length);
    } else {
      setRandomNumber(randomNumber - 1);
    }
  };
  
  const increase = (randomNumber) => {
    if (randomNumber === 5) {
      setRandomNumber(1);
    } else {
      setRandomNumber(randomNumber + 1);
    }
  }

  useEffect(() => {
    getData()
    getRandomCourse(randomNumber)
  }, [randomNumber])

  return (
    <div>
      { isLoading == true ? <div>Serverdan veriler yükleniyor...</div> : 
        <div className="container">
          <h2>Kurslarım</h2>
          <button className='random-btn' onClick={() => getRandomNumber(1, 5)}>Rastgele kurs getir !</button>
          <div className="card-body">
            <button onClick={() => {decrease(randomNumber)}}><FaChevronLeft/></button>
            <div className="card-course">
              <div className="title">{course.title}</div>
              <div className="content">{course.content}</div>
              <div className="price">{course.price} ₺</div>
            </div>
            <button onClick={() => {increase(randomNumber)}}><FaChevronRight/></button>
          </div>
        </div>
      }
    </div>
  )
}

export default NewCourses