import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export function Check() {
  // Create a state variable to track the visibility of the collapsible sections
  const [isSectionsOpen, setSectionsOpen] = useState({ section1: false, section2: false });
  const nav = useNavigate();
  // Function to toggle the visibility of a section
  const toggleSection = (sectionName) => {
    setSectionsOpen((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  return (
    <div>
      <button onClick={() => toggleSection('section1')}>
        {isSectionsOpen.section1 ? 'Collapse Section 1' : 'Expand Section 1'}
      </button>
      {isSectionsOpen.section1 && (
        nav('/create')
      )}

      <button onClick={() => toggleSection('section2')}>
        {isSectionsOpen.section2 ? 'Collapse Section 2' : 'Expand Section 2'}
      </button>
      {isSectionsOpen.section2 && (
        <div>
          <h2>Section 2 Content</h2>
          <p>This is the content of Section 2.</p>
        </div>
      )}
    </div>
  );
}


