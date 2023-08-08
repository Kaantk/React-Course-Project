import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import './Courses.css'

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:3004/courses/${id}`);
      const updatedCourses = courses.filter(course => course.id !== id);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Kursu silme hatası:", error);
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <>
      { isLoading == true ? 
        <div>Serverdan veriler yükleniyor...</div> : 
        <div className="container">
          <h2>Kurslarım</h2>
          <div className="container-body">
            {courses.map((course, id) => (
              <div className="card-course" key={id}>
                <div className="title">{course.title}</div>
                <div className="content">{course.content}</div>
                <div className="card-btn">
                  <div className="price">{course.price} ₺</div>
                  <button className='delete-btn' id={course.id} onClick={() => deleteCourse(course.id)}>Kursu Sil</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  )
}

export default Courses
